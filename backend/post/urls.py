from django.urls import path
from .views import CreatePlotView, ListPlotView, UpdatePlotView, DeletePlotView, RetrievePlotView

urlpatterns = [

    # Plot API's endpoints
    path('plot/create/', CreatePlotView.as_view(), name='create_plot'),
    path('plot/list/', ListPlotView.as_view(), name='plot_list'),
    path('plot/<int:pk>/update/', UpdatePlotView.as_view(), name='update_plot'),
    path('plot/<int:pk>/delete/', DeletePlotView.as_view(), name='delete_plot'),
    path('plot/<int:pk>/retrive/', RetrievePlotView.as_view(), name='retrive_plot'),

]