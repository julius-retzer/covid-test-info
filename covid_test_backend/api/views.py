# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import random

from django.http import JsonResponse, HttpResponseNotFound


def check(request):
    assert request.method == 'POST'

    executed_at = request.POST.get('executed_at')
    id_number = request.POST.get('id_number')

    # TODO validate these
    assert executed_at
    assert id_number

    # TODO gather from database

    if random.random() < 0.5:
        return HttpResponseNotFound()

    return JsonResponse({
        'test_result': random.random() < 0.5
    })
