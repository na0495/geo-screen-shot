from rest_framework import generics, status
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.response import Response
from .models import Plot
from .serializers import PlotSerializer

# Create your views here.
#* Create Plot Api View
class CreatePlotView(generics.CreateAPIView):
    queryset = Plot.objects.all()
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PlotSerializer

    def post(self, request, format=None):
        serializer = PlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#* Retrieve Plot Api View
class RetrievePlotView(generics.RetrieveAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer


#* Update Plot Api View
class UpdatePlotView(generics.UpdateAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer


#* Delete Plot Api View
class DeletePlotView(generics.DestroyAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer


#* List Plot Api View
class ListPlotView(generics.ListAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer