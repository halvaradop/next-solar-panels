from django.db import models


class Field(models.Model):
    idfield = models.CharField(db_column='idField', primary_key=True, max_length=36)  # Field name made lowercase.
    designation = models.CharField(max_length=255)
    fence = models.IntegerField(blank=True, null=True)
    connectionearthingfence = models.IntegerField(db_column='connectionEarthingFence', blank=True, null=True)  # Field name made low>
    externalcurrentinfluence = models.IntegerField(db_column='externalCurrentInfluence', blank=True, null=True)  # Field name made l>    state = models.CharField(max_length=8, blank=True, null=True)
    idaddress = models.ForeignKey(Address, models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.
    idproject = models.ForeignKey('Project', models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Field'
