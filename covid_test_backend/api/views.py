# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

import bcrypt as bcrypt
from django.http import JsonResponse, HttpResponse

from .models import TestResult


def check(request):
    assert request.method == 'POST'

    executed_at = request.POST.get('executed_at')
    id_number = request.POST.get('id_number')

    # TODO validate these
    assert executed_at
    assert id_number

    test_result = TestResult.check_test_result(executed_at, id_number)

    response = JsonResponse({
        'test_result': 'negative' if test_result else 'notfound'
    })

    response['Access-Control-Allow-Origin'] = '*'

    return response


def __generate_hash():
    pass
    # sent_data = id_number
    # salt = bcrypt.gensalt()
    # hashed = bcrypt.hashpw(sent_data.encode('utf-8'), salt)
    # print(salt, hashed)
    # return HttpResponse(f'{salt} ... {hashed}')


def add_results(request):
    # flow: rozdel input na riadky, kazdy riadok na jednotlive kusy dat, s nimi vyrob instanciu TestResult, uloz do DB.

    # [
    #     {
    #         "date": "2020-03-18",
    #         "salt": "$2a$10$zs8NOs0TXTk9nQjyOm0etO",
    #         "result": "0"
    #     },
    #     {
    #         ...
    #     }
    # ]

    #data = json.loads(request.read())
    # first hash is for 990225/6089
    data = json.loads('[{"date": "2020-03-18","hash": "$2a$10$zs8NOs0TXTk9nQjyOm0etOwC/TIVMpSOCOSPtiibJHZ4BVWLBlw52","result": 0}]')

    for row in data:
        new_test_result = TestResult(
            executed_at=row.get('date'),
            hash_patient=row.get('hash'),
            result=row.get('result')
        )
        new_test_result.save()

    return HttpResponse(f'pridali sme {len(data)} výsledkov testov')
