from .models import Plot
from rest_framework import serializers

# Plot serializer
class PlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plot
        fields = ('__all__')