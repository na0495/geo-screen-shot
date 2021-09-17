from django.db import models
from django.utils.translation import gettext_lazy as _


# Upload to function
def upload_to(instance, filename):
    return 'plot/{filename}'.format(filename=filename)


# Plot model
class Plot(models.Model):
    name = models.CharField(max_length=200)
    size = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(_("Image"), upload_to=upload_to)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name