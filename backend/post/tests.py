from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from .models import Plot
from model_bakery import baker
from django.core.files.uploadedfile import SimpleUploadedFile


# Create your tests here.

client = APIClient()

class GetAllPlotTestCase(APITestCase):
    """Get all plot api test case"""
    def setUp(self):
        self.plot = baker.make(Plot, _quantity=500)
    
    def test_get_all_plot(self):
        response = client.get(reverse('plot_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 500)
    


class GetSingelPlotTestCase(APITestCase):
    """Get singel plot api test case"""
    def setUp(self):
        self.plot = baker.make(Plot)
    
    def test_get_singel_plot(self):
        url = reverse('retrive_plot', kwargs={'pk': self.plot.pk})
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.plot.pk)
    


class CreatePlotTestCase(APITestCase):
    def setUp(self):
        self.valid_data = {
            'name': 'test_plot',
            'size': 4950.30,
            'image': SimpleUploadedFile(name='default.jpg', content=open('media/image/default.png', 'rb').read(), content_type='image/jpg'),
        }
        self.invalid_data = {
            'name': '',
            'size': 4950.30,
            'image': 0,
        }

    def test_create_plot_with_valid_data(self):
        response = client.post(reverse('create_plot'), self.valid_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Plot.objects.count(), 1)
        self.assertEqual(Plot.objects.get().name, 'test_plot')
    

    def test_create_plot_with_invalid_data(self):
        response = client.post(reverse('create_plot'), self.invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Plot.objects.count(), 0)
    

class UpdatePlotTestCase(APITestCase):
    def setUp(self):
            self.plot = baker.make(Plot)
            self.valid_data = {
                'name': 'test_plot',
                'size': 4950.30,
                'image': SimpleUploadedFile(name='default.jpg', content=open('media/image/default.png', 'rb').read(), content_type='image/jpg'),
            }
            self.invalid_data = {
                'name': '',
                'size': 4950.30,
                'image': 0,
            }

    def test_update_plot_with_valid_data(self):
        url = reverse('update_plot', kwargs={'pk': self.plot.pk})
        response = client.put(url, self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(Plot.objects.get().name, 'test_plot')
    
    def test_update_plot_with_invalid_data(self):
        url = reverse('update_plot', kwargs={'pk': self.plot.pk})
        response = client.put(url, self.invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)




class DeletePlotTestCase(APITestCase):
    def setUp(self):
        self.plot = baker.make(Plot)
    
    def test_delete_plot(self):
        url = reverse('delete_plot', kwargs={'pk': self.plot.pk})
        response = client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Plot.objects.count(), 0)