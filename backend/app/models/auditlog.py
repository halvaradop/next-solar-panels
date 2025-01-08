from django.db import models


class Auditlog(models.Model):
    id_audit = models.AutoField(db_column='idAudit', primary_key=True)  # Field name made lowercase.
    table_name = models.CharField(db_column='tableName', max_length=100)  # Field name made lowercase.
    action_type = models.CharField(db_column='actionType', max_length=6)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=8, blank=True, null=True)
    id_contact_person = models.ForeignKey('Contactperson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercas>

    class Meta:
        managed = False
        db_table = 'AuditLog'
