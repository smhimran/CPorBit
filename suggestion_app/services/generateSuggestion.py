import requests
import random
import numpy as np


from datetime import datetime
from django.utils.timezone import make_aware
from django.db.models import Avg
from sklearn.neighbors import NearestNeighbors

from user_app.models import Profile
from problem_app.models import (AcceptedSubmission, Problem)
from suggestion_app.models import Suggestion

def delete_suggestion(user):
    try:
        Suggestion.objects.filter(user=user).delete()
    except Exception as e:
        print(e)
        return False
    return True


def filter_suggestions(problems, rating):
    problem_data = []
    problem_map = []

    for problem in problems:
        avg_rating = AcceptedSubmission.objects.filter(problem=problem).aggregate(Avg('current_rating'))[
                         'current_rating__avg'] or 1000
        score = problem.score
        problem_data.append([score, avg_rating])
        problem_map.append(problem)

    if not problem_data:
        print("No problems found for KNN filtering.")
        return []

    # Convert to numpy array for KNN
    problem_data = np.array(problem_data)

    # KNN model
    knn = NearestNeighbors(n_neighbors=min(100, len(problem_data)), algorithm='auto')
    knn.fit(problem_data)

    # Use user's rating as the query point
    _, indices = knn.kneighbors([[rating, rating]])

    # Retrieve top problems
    top_problems = [problem_map[idx] for idx in indices[0]]

    # Shuffle and return top 50
    random.shuffle(top_problems)
    return [{'problem': problem} for problem in top_problems[:10]]


def generate_new_suggestion(user):
    if delete_suggestion(user) == False:
        return False
    
    try:
        profilenow = Profile.objects.get(user=user)
    except Exception as e:
        print(e)
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
    except Exception as e:
        print(e)
        rating = 1000
    
    queryset = Problem.objects.filter(score__range=(rating - 200, rating + 400)).exclude(id__in = AcceptedSubmission.objects.filter(user=user).values('problem'))
    
    problems = filter_suggestions(queryset, rating)
    
    for problem in problems:
        suggestion = Suggestion(
            user=user,
            problem=problem['problem'],
            timestamp= make_aware(datetime.now())
        )
        try:
            suggestion.save()
        except Exception as e:
            print(e)
    
    print('Suggestion Generated for ' + user.username)
    
    profilenow.is_updating = False
    profilenow.save()
    
    return True    
