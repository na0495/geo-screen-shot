from .models import Plot, Coordinates
from rest_framework import serializers

# Plot serializer
class PlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plot
        fields = ('__all__')


# Coordinates serializer
class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ('__all__')


# Plot serializer to display in the map with polygen coordinates
class DisplayPlotSerializer(serializers.ModelSerializer):
    coordinates = CoordinatesSerializer(many=True, read_only=True)
    class Meta:
        model = Plot
        fields = ('__all__')