FROM python:3.7-alpine
LABEL Author="contacttoamit00@gmail.com"

ENV PYTHONUNBUFFERED 1

RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev

COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

RUN apk del .tmp-build-deps

EXPOSE 8000

RUN adduser -D user

WORKDIR /usr/src/app
COPY --chown=user:1000 ./app /usr/src/app

COPY ./run.sh /usr/src/app
RUN chmod +x run.sh

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static


RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user
