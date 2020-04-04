# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import random

from django.http import JsonResponse, HttpResponseNotFound

from .models import TestResult


def check(request):
    #assert request.method == 'POST'

    executed_at = request.GET.get('executed_at')
    id_number = request.GET.get('id_number')

    # TODO validate these
    assert executed_at
    assert id_number

    test_result = TestResult.check_test_result(executed_at, id_number)

    return JsonResponse({
        'test_result': test_result
    })
