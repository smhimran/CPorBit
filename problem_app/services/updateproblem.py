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
            except Exception as e:
                print(e)
                print('Error adding new tag ' + tag_name)
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
        print('new problem added ' + str(cf_problem['contestId']) + cf_problem['index'])
    except Exception as e:
        print(e)
        print('Error adding new problem')
        return False
    return True

def updateTags(cf_problem):
    problemId = str(cf_problem['contestId']) + cf_problem['index']
    try:
        problemnow = Problem.objects.get(cf_problem_id = problemId)
    except Exception as e:
        print(e)
        print('Error finding problem')
        return False
    updated = False
    if problemnow.score != cf_problem['rating']:
        problemnow.score = cf_problem['rating']
        updated = True
        
    for it in cf_problem['tags']:
        try:
            tagnow = Tag.objects.get(name = it)
        except Exception as e:
            print(e)
            print('Error finding tag')
            continue
        if problemnow.tag.filter(id = tagnow.id).exists():
            continue
        problemnow.tag.add(tagnow)
        updated = True
    if updated:
        problemnow.timestamp_updated = make_aware(datetime.now())
        problemnow.save()
        print('Problem Updated ' + problemnow.cf_problem_id)
    return True


def updateProblem(cf_problem):
    problemId = str(cf_problem['contestId']) + cf_problem['index']
    
    if addTag(cf_problem['tags']) == False:
        return False
    
    if Problem.objects.filter(cf_problem_id = problemId).exists():
        return updateTags(cf_problem)
    
    if addProblem(cf_problem) == False:
        return False
    
    # try:
    #     problemnow = Problem.objects.get(cf_problem_id = problemId)
    # except:
    #     print('Error finding problem')
    # else:
    #     for it in cf_problem['tags']:
    #         try:
    #             tagnow = Tag.objects.get(name = it)
    #         except:
    #             print('Error finding tag')
    #         else:
    #             try:
    #                 problemnow.tag.add(tagnow)
    #             except:
    #                 print('Error in adding tag to problem')
    return updateTags(cf_problem)