from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from problem_app.models import (Tag, Problem)
from problem_app.serializers.ProblemSerializer import (ProblemListSerializer, ProblemSerializer)


class ProblemListAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_total_solved(self, problem):
        return problem.get('total_solved')
    
    def get_score(self, problem):
        return problem.get('score')
    
    def get(self, request):
        orderby = request.GET.get('order')
        tag = request.GET.get('tag')
        score_from = request.GET.get('from')
        score_to = request.GET.get('to')
        
        score_min = 0
        score_max = 4000
        
        if score_from:
            score_min = int(score_from)
        if score_to:
            score_max = int(score_to)
        
        
        queryset = []
        
        if tag:
            queryset = Problem.objects.filter(tag__name=tag, score__range=(score_min, score_max))
        else:
            queryset = Problem.objects.filter(score__range=(score_min, score_max))
        
        serializer = ProblemListSerializer(queryset, many = True, context={'username': request.user.username})
        
        problemlist = []
        
        if orderby == 'SOLVED_ASC':
            problemlist.append(sorted(serializer.data, key=self.get_total_solved))
        elif orderby == 'SOLVED_DESC':
            problemlist.append(sorted(serializer.data, key=self.get_total_solved, reverse=True))
        elif orderby == 'SCORE_ASC':
            problemlist.append(sorted(serializer.data, key=self.get_score))
        elif orderby == 'SCORE_DESC':
            problemlist.append(sorted(serializer.data, key=self.get_score, reverse=True))
        else:
            problemlist.append(serializer.data)
            
        return Response({
            'status': 'OK',
            'problems': problemlist
        })
        
class ProblemAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, cf_problem_id):
        try:
            queryset = Problem.objects.get(cf_problem_id = cf_problem_id)
        except Exception as e:
            print(e)
            print('Problem not found')
            return Response({
                'status': 'FAILED',
                'message': 'Problem not found'
            })
        serializer = ProblemSerializer(queryset, context={'username': request.user.username})
        return Response({
            'status': 'OK',
            'problem': serializer.data
        })
