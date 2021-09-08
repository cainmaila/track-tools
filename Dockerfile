FROM node:14.3.0-alpine3.10
ADD tmp.tgz /
COPY .gitmodules /
COPY .prettierrc /
RUN yarn
RUN yarn build
EXPOSE 80
ENTRYPOINT ["yarn","start"]
