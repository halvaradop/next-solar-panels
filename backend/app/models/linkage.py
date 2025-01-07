from django.db import models


class Linkage(models.Model):
    idlinkage = models.CharField(db_column='idLinkage', primary_key=True, max_length=255)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    idpositiondata = models.ForeignKey('Positiondata', models.DO_NOTHING, db_column='idPositionData')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Linkage'
