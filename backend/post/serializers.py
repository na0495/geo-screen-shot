from .models import Plot
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

# Plot serializer
# class PlotSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Plot
#         fields = ('__all__')



class PlotSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Plot
        geo_field = 'geofence'
        # bbox_geo_field = 'bbox_geometry'
        fields = ('__all__')