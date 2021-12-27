from datetime import datetime

import requests
from django.utils.timezone import make_aware
from gamification_app.models import ScoreBoard
from problem_app.models import AcceptedSubmission, Problem
from problem_app.services.updateproblem import updateProblem
from user_app.models import Profile, UserStatistic


def getSubmissionRating(responseRatingChange, submissiontime):
    lo = 0
    hi = len(responseRatingChange)-1
    ans = 0
    if hi < 0:
        return ans
    if submissiontime < responseRatingChange[0]['ratingUpdateTimeSeconds'] :
        return ans
    if submissiontime >= responseRatingChange[hi]['ratingUpdateTimeSeconds'] :
        return responseRatingChange[hi]['newRating']
    
    while lo <= hi:
        mid = (lo + hi)//2
        if submissiontime >= responseRatingChange[mid]['ratingUpdateTimeSeconds'] :
            ans = mid
            lo = mid + 1
        else :
            hi = mid - 1
            
    return responseRatingChange[ans]['newRating']   


def getACSubmission(cf_username):
    response1 = requests.get("https://codeforces.com/api/user.rating?handle=" + cf_username)
    
    if response1.status_code != 200 or response1.json()['status'] != 'OK':
        return dict({
            'status': 'FAILED',
        })
    
    responseRatingChange = response1.json()['result']
    
    response2 = requests.get("https://codeforces.com/api/user.status?handle="+ cf_username)
    
    if response2.status_code != 200 or response2.json()['status'] != 'OK':
        return dict({
            'status': 'FAILED',
        })

    responseSubmission = response2.json()['result'][::-1]

    ProblemSubmission = dict(dict())

    for it in responseSubmission:
        if it['verdict'] == 'OK' and 'contestId' in it and 'rating' in it['problem']:
            problemID = str(it['problem']['contestId']) + it['problem']['index']
            if problemID not in ProblemSubmission:
                ProblemSubmission[problemID] = {
                    'submissionId': it['id'],
                    'creationTimeSeconds': it['creationTimeSeconds'],
                    'participantType': it['author']['participantType'],
                    'currentrating': getSubmissionRating(responseRatingChange, it['creationTimeSeconds']),
                    'problem': it['problem']
                } 

    return dict({
        'status': 'OK',
        'submissions': ProblemSubmission,
    })
    
    
def updateSubmission(user):    
    profilenow = Profile.objects.get(user=user)
    
    profilenow.is_updating = True    
    profilenow.timestamp_updatedsubmission = make_aware(datetime.now())
    profilenow.save()
    
    cf_username = profilenow.cf_handle
    submissions = getACSubmission(cf_username)
    
    if submissions['status'] != 'OK':
        print('CF request error')
        profilenow.is_updating = False
        profilenow.save()
        return dict({
            'status' : 'Failed',
            'message': 'CF request error'
        })
    
    updatedcount = 0
    
    for key, value in submissions['submissions'].items():
        if updateProblem(value['problem']) == False:
            continue
        try:
            problemnow = Problem.objects.get(cf_problem_id = key)
        except Exception as e:
            print(e)
            print('Problem not found')
            continue
        if AcceptedSubmission.objects.filter(problem = problemnow, user = user).exists():
            continue
        
        try:
            new_submission = AcceptedSubmission(
                problem = problemnow,
                user = user,
                cf_submission_id = value['submissionId'],
                timestamp = make_aware(datetime.fromtimestamp(value['creationTimeSeconds'])),
                participantType = value['participantType'],
                current_rating = value['currentrating']
            )
            new_submission.save()

            for tag in problemnow.tag.all():
                userstat = UserStatistic.objects.filter(user=user).filter(tag=tag)
                if userstat:
                    userstat[0].count += 1
                    userstat[0].score += problemnow.score
                    userstat[0].save()
                
                else:
                    new_userstat = UserStatistic(
                        user = user,
                        tag = tag,
                        count = 1,
                        score = problemnow.score
                    )
                    new_userstat.save()

                scoreboard = ScoreBoard.objects.get(user=user)
                scoreboard.score += problemnow.score
                scoreboard.save()

        except Exception as e:
            print(e)
            print('Submission not saved')
        
        updatedcount += 1
            
    print('Updated ' + str(updatedcount) + ' submissions for ' + user.username)
    
    profilenow.is_updating = False
    profilenow.save()
    
    return dict({
        'Status': 'OK',
        'message': 'Submission update Complete of total ' + str(updatedcount)
    })
    
def deleteSubmission(user):    
    profilenow = Profile.objects.get(user=user)
    
    profilenow.is_updating = True    
    profilenow.timestamp_updatedsubmission = make_aware(datetime.now())
    profilenow.save()
    
    try:
        AcceptedSubmission.objects.filter(user = user).delete()
        userstat = UserStatistic.objects.filter(user = user)
        userstat.delete()
        scoreboard = ScoreBoard.objects.get(user=user)
        scoreboard.score = 0
        scoreboard.save()

    except Exception as e:
        print(e)
        print('Error deleting submission for ' + user.username)
    
    profilenow.is_updating = False
    profilenow.save()
    
    print('Successfully Deleted all submission for user ' + user.username)
    
    return dict({
        'Status': 'OK',
        'message': 'Deleted Submissions for ' + user.username
    })
