from django.db import models

class Positionresistivityonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionresistivity = models.OneToOneField(Positionresistivity, models.DO_NOTHING, db_column='idPositionResistivity', primary_>

    class Meta:
        managed = False
        db_table = 'PositionResistivityOnLinkage'
