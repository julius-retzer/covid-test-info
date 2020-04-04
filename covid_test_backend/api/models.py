# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import bcrypt

from django.db import models


class TestResult(models.Model):
    executed_at = models.DateField('day month and year the test was executed')
    salt = models.CharField(max_length=36)
    hash_patient = models.CharField(max_length=60)
    result = models.BooleanField()

    @staticmethod
    def check_test_result(executed_at, id_number):
        tests = TestResult.objects.filter(executed_at=executed_at)

        for db_test in tests:
            sent_data = id_number + db_test.salt
            db_hash = db_test.hash_patient

            try:
                if bcrypt.checkpw(sent_data.encode('utf8'), db_hash.encode('utf8')):
                    return True
            except Exception:
                continue

        return False
