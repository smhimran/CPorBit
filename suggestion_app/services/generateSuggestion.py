import logging
logger = logging.getLogger('django')

import requests
import random

from datetime import datetime
from django.utils.timezone import make_aware
from django.db.models import Avg

from user_app.models import Profile
from problem_app.models import (AcceptedSubmission, Problem)
from suggestion_app.models import Suggestion

def delete_suggestion(user):
    try:
        Suggestion.objects.filter(user=user).delete()
    except Exception as ex:
        logger.exception(ex)
        return False
    return True


def filter_suggestions(problems, rating):
    pqlist = []
    for problem in problems:
        avgrating = int(AcceptedSubmission.objects.filter(problem = problem).aggregate(Avg('current_rating'))['current_rating__avg'])
        score = problem.score
        pqlist.append({
            'problem': problem,
            'number': abs(rating - avgrating) + abs(rating - score)
        })
    finalproblems = sorted(pqlist, key = lambda x: x['number'])[:100]
    random.shuffle(finalproblems)
    return finalproblems[:50]


def generate_new_suggestion(user):
    try:
        if delete_suggestion(user) == False:
            return False
        
        try:
            profilenow = Profile.objects.get(user=user)
        except Exception as ex:
            logger.exception(ex)
            return False
        cf_username = profilenow.cf_handle
        
        profilenow.is_updating = True
        profilenow.save()
        
        response = requests.get("https://codeforces.com/api/user.info?handles=" + cf_username)
        
        if response.status_code != 200 or response.json()['status'] != 'OK':
            profilenow.is_updating = False
            profilenow.save()
            return False
        
        try:
            rating = response.json()['result'][0]['rating']
        except Exception as ex:
            logger.exception(ex)
            rating = 1000
        
        queryset = Problem.objects.filter(score__range=(rating - 200, rating + 400)).exclude(id__in = AcceptedSubmission.objects.filter(user=user).values('problem'))
        
        problems = filter_suggestions(queryset, rating)
        
        for problem in problems:
            sugnow = Suggestion(
                user=user,
                problem=problem['problem'],
                timestamp= make_aware(datetime.now())
            )
            try:
                sugnow.save()
            except Exception as ex:
                logger.exception(ex)
        
        logger.info('Suggestion Generated for ' + user.username)
        
        profilenow.is_updating = False
        profilenow.save()
        
        return True
    except Exception as ex:
        logger.exception(ex)
        return False        
