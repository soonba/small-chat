24.08 현재 v3.0 리팩토링 진행 중입니다.

</br></br></br></br>
### ↓과거 문서(v2.0)
</br>
# 작은 대화 (small-chat)

small-chat은 [graphql subscription](https://www.apollographql.com/docs/react/data/subscriptions) 기술을 기반으로 하는 다대다 프라이빗 채팅
애플리케이션입니다. <br />
아이디와 비밀번호로 회원가입하여 방을 생성하고, 방 식별 코드를 다른 유저에게 전달합니다. <br />
참여자는 해당 코드로 방을 참여하여 채팅이 가능합니다. <br />
유저 한 명이 여러 개 방을 참여할 수 있고, 방 목록에서 마지막 메시지 및 읽지 않은 메시지 개수를 확인할 수 있습니다.

> ✅️ 프로젝트 참고 내용 <br />
> 이 앱은 localhost 에서 동작하므로 독립된 브라우저끼리만 테스트 가능합니다. <br />
> 초기 퍼블리싱 작업을 제외한 1인 프로젝트이며, 개발간 경험을 [블로그](https://sunba30.tistory.com/52)에 정리하였습니다. <br />
>
> 퍼블리싱 및 프론트엔드 코드 리뷰에 도움을 주신 분 <br />
> [@akffkdahffkdgo77](https://github.com/akffkdahffkdgo77)

## 실행

```
docker-compose up -d
```

컨테이너가 모두 정상적으로 실행됐다면 ```localhost:3000``` 에서 접속 가능합니다.

## 기능 소개

### 1. 회원가입 <br />

![git_회원가입](https://github.com/soonba/small-chat/assets/74886848/8ffc315d-3e6a-49c6-9161-61997fe8e7d0)

<br />
<br />

### 2. 방 생성 & 참여 <br />

![git_방](https://github.com/soonba/small-chat/assets/74886848/7a5e0259-bdeb-40a8-816c-8ae8f12d7f5d)

### 3. 채팅 <br />

![git_채팅](https://github.com/soonba/small-chat/assets/74886848/294a7a11-d84b-44ec-b97a-179a68a176d4)

### 적용 기술
```
frontend
ㄴ React
ㄴ nginx (배포)

backend
ㄴ node.js/nest.js (채팅 서비스)
ㄴ java/spring (채팅 외 서비스)
ㄴ redis (메시지 브로커)

database
ㄴ mongoDB (채팅 내역 저장)
ㄴ postgreSQL (채팅 외 회원 정보, 방 정보 저장)
```
