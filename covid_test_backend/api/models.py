# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.db import models


class TestResult(models.Model):
    executed_at = models.DateField('day month and year the test was executed')
    hash_patient = models.CharField(max_length=60)
    result = models.BooleanField()

