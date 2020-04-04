# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.db import models


class TestResult(models.Model):
    executed_at = models.DateField('day month and year the test was executed')
    hash = models.BinaryField(60)
    result = models.BooleanField()

