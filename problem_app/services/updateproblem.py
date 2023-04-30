import logging
logger = logging.getLogger('django')

from problem_app.models import (Tag, Problem)

from datetime import datetime
from django.utils.timezone import make_aware


def addTag(tags):
    for tag_name in tags:
        if Tag.objects.filter(name = tag_name).exists() == False:
            try:
                new_tag = Tag(name = tag_name)
                new_tag.save()
                print('new tag added ' + tag_name)
            except Exception as ex:
                logger.exception(ex)
                return False
    return True


def addProblem(cf_problem):
    try:
        new_problem = Problem(
            cf_problem_id = str(cf_problem['contestId']) + cf_problem['index'],
            cf_problem_index = cf_problem['index'],
            cf_contest_id = cf_problem['contestId'],
            cf_problem_name = cf_problem['name'],
            score = cf_problem['rating'],
            timestamp_updated = make_aware(datetime.now())
        )
        new_problem.save()
        logger.info('new problem added ' + str(cf_problem['contestId']) + cf_problem['index'])
    except Exception as ex:
        logger.exception(ex)
        return False
    return True

def updateTags(cf_problem):
    problemId = str(cf_problem['contestId']) + cf_problem['index']
    try:
        problemnow = Problem.objects.get(cf_problem_id = problemId)
    except Exception as ex:
        logger.exception(ex)
        return False
    updated = False
    if problemnow.score != cf_problem['rating']:
        problemnow.score = cf_problem['rating']
        updated = True
        
    for it in cf_problem['tags']:
        try:
            tagnow = Tag.objects.get(name = it)
        except Exception as ex:
            logger.exception(ex)
            continue
        if problemnow.tag.filter(id = tagnow.id).exists():
            continue
        problemnow.tag.add(tagnow)
        updated = True
    if updated:
        problemnow.timestamp_updated = make_aware(datetime.now())
        problemnow.save()
        logger.info('Problem Updated ' + problemnow.cf_problem_id)
    return True


def updateProblem(cf_problem):
    try:
        problemId = str(cf_problem['contestId']) + cf_problem['index']
        
        if addTag(cf_problem['tags']) == False:
            return False
        
        if Problem.objects.filter(cf_problem_id = problemId).exists():
            return updateTags(cf_problem)
        
        if addProblem(cf_problem) == False:
            return False
        
        return updateTags(cf_problem)
    except Exception as ex:
        logger.exception(ex)
        return False