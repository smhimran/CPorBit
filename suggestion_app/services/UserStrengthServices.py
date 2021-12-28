from problem_app.models import AcceptedSubmission, Tag
from user_app.models import UserStatistic


def getUserStrengthsOnTags(user):
    user_stats = UserStatistic.objects.filter(user=user).order_by('-score')
    tags = Tag.objects.all()
    tags = sorted(tags, key=lambda x: AcceptedSubmission.objects.filter(problem__tag=x).count(), reverse=True)
    user_strengths = []

    for item in user_stats:
        user_strengths.append(item.tag.name)

    for tag in tags:
        if tag.name not in user_strengths:
            user_strengths.append(tag.name)

    return user_strengths
