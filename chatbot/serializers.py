from rest_framework import serializers

class QuerySerializer(serializers.Serializer):
    query = serializers.CharField()

class SourceSerializer(serializers.Serializer):
    content = serializers.CharField()
    page_no = serializers.IntegerField()

class ResponseSerializer(serializers.Serializer):
    response = serializers.CharField()
    sources = SourceSerializer(many=True)