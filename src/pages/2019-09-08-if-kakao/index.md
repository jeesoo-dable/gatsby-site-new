---
path: '/if-kakao'
date: '2019-09-08'
title: 'if(kakao)dev2019 1일차'
tags: ['conference', 'kakao']
excerpt: '어쩌다 다녀왔습니다'
---

카카오 개발자 컨퍼런스에 다녀왔다. 사람이 정말 많아서 세상에 이렇게 개발자가 많다니! 하고 놀라 버렸다. 총 4개의 세션을 들었고, 간단하게 각 세션 내용을 요약해 보았다.

## 리액트: 그것마저 결정해주마

11:00-11:45(카카오페이지)

카카오페이지는 5년 넘는 서비스로, 기존에는 spring/jsp로 되어 있었고 레거시 코드가 많았다. 이를 react로 포팅하는 작업을 1년간 진행했다. react는 수많은 옵션 중 나에게 맞는 것을 찾아가는 과정이었다.

**컴포넌트 코드를 일관성 있게 작성하고 싶어요.**

- 컨벤션을 정한다. 타입을 가장 먼저 정의하는 것이 중요하다.
- eslint를 사용하고, 커스텀 룰을 사용해서 팀만의 규칙을 정한다.

**고민2) 기존 클래스형 컴포넌트를 훅으로 변경해야 할까요?**

- 클래스형 컴포넌트가 지상파 서비스라면, 함수형 컴포넌트는 유투브. 거스를 수 없는 대세지만, 그렇다고 클래스 컴포넌트를 당장 버리라는 말은 아니다.
- hook은 장점이 많다.
    - 가령, 클래스 컴포넌트에서는 componentDidMount와 componentDidUpdate에서 통신하는 비동기 코드를 동일하게 두 번 사용한다거나, 창의 사이즈를 인지하는 resize 이벤트를 componentDidMount에서 핸들러를 붙이고, componentWillUnmount에서 핸들러를 삭제해야 한다. hook에서는 useEffect 한번만 사용하면 같은 기능의 코드를 섞지 않고, 또 중복해 사용하지 않고도 이용할 수 있다.
    - 고차 컴포넌트를 사용할 때도 작성할 코드가 길지만, hook을 사용하면 훨씬 짧아진다. 타입 정의도 쉬워진다.

**고민3) 서버사이드 렌더링을 해야할까요?**

- 가급적 피할 수 있으면 피하자. 실사용자 대상의 서비스를 해야한다면 어쩔 수 없이 해야 한다.

**고민4) 렌더 함수 안에서 새로운 객체를 생성해도 되나요?**

- hook에서는 새로운 객체를 적극 사용한다. useCallback 메소드를 사용하여 메모이제이션 기능을 사용한다면 문제 없다.

**고민5) 리덕스를 써야하나요?**

- 쉽게 쓰는 방법을 고민해본다.
    - 값만 바꿀 때에는 action을 하나 만들어서 재활용한다. 타입을 잘못 사용할 가능성이 있으니 조심해야 한다.
    - redux에서도 Hook을 지원하기 시작했다.

**고민6) 주위에서 타입스크립트 얘기가 많이 들리는데요, 정적 타입을 도입하는 게 좋을까요?**

- 생산성이 올라간다. 쓸 수 있으면 써야한다.

고민7) css-in-js를 사용하려면?

- [rebass]([https://rebassjs.org/](https://rebassjs.org/))를 써라. 코드를 많이 줄일 수 있고, 반응형에도 잘 대응한다.

---

## 초당옥수수의 취소를 막아라! : 수만 건의 주문을 1초내에 처리하는 기술

12:00 - 12:45 (카카오커머스)

농작물은 수확 후 보관할 수가 없어서, 수확 전 미리 구매를 받기 시작하고 2-3주간 기다리고 수확과 동시에 택배발송을 한다. 비가 오면 햇빛에 말렸다가 수확해야 하는 등 배송이 지연되는 경우가 왕왕 발생한다. 이 경우, 판매자가 구매자한테 배송지연 사유를 빠르게 알리는데, 이때 카카오톡을 통해서 배송지연 처리 메시지 TMS(Target Messaging System) 를 보내는 기능을 사용한다. 초당옥수수 시즌을 맞아서 배송지연 안내가 대량으로 나가게 될텐데, 레거시 코드에서는 이를 잘 대응할 수 없는 상황.

문제 1) 실시간 안내가 아니라 batch를 통하여 1시간 간격으로 처리한다. 배송지연 처리가 몰리는 시즌을 대비해서 넉넉하게 대비할 수는 있고 또 최대한 간격을 줄일 수는 있지만, 결국 실시간으로 대응하지 못하는 상황이었다.

문제 2) 비즈니스 로직이 복잡했다. 덕지덕지 코드가 붙어있어 단방향으로 비즈니스 로직이 흘러가지 않았다. 

그 외) REST 요청이 단일 스레드이다보니, 트랜잭션, 실패 처리 등에서 유연하지 못해서 다른 방법을 찾아야 했고, 속도가 많이 느렸다.

해결방안 1) 배치가 아니라 TMS 비동기 워커로 변경했다. 단일 스레드는 동일하나 validation만 처리해서 빠른 시간에 처리가 가능하다. 

해결방안 2) CS의 액터 모델에서 개념을 착안한 분산처리 시스템을 도입했다. 액터 모델과 정확하게 일치하는 것은 아니지만, consumer가 단 하나의 queue만을 consume하고, 각 consumer가 atomic한 단위로 작업하게끔 보장하여 서로 영향을 주지 않도록 했다. 머신 당 기본/최소/최대 consumer 개수를 설정하고, 또 비즈니스에 따라서 오버라이드가 가능하도록 설정했다.

- 액터 모델: 액터(행위자)를 병행 연산의 기본 단위로 취급하는 병행 컴퓨팅의 수학적 모델. 액터는 액터가 받는 메시지에 대응하여 자체적인 결정을 하고 더 많은 액터를 만든다. 그러면 더 많은 메시지를 보내고, 또 메시지에 대한 응답 행위를 지정한다.
- 묶음배송 등 atomic한 단위로 액터 군을 이동할 때 오류 상황에서 재처리 시 동시에 동일한 주문을 처리할 수 있다. 데이터 정합성은 주로 코드레벨에서 해결하려고 했다.

해결방안 3) 에러가 발생했을 때 자동으로 재처리를 하고, 실패를 감지하는 시스템을 만들었다. 배송은 외부 파트너사 api 연동이 아주 많아서, 전체 요청의 1%가 타임아웃 되었다. 비동기 워커의 큐와 메시지를 설정하고 rabbitMQ를 사용해서 재처리로 자동 수행되도록 했다. 실패 처리를 분기하여 최대 회수를 초과하지 않았을 경우 다시 처리하도록 설정했다.

해결방안 4) 롤백을 배포하는 동안에도 에러가 발생할 수 있기 때문에, 배포하지 않고 롤백하는 방안을 고민했다. Zookeeper를 사용해서 스위치가 꺼져 있을 때는 기존 api를, 켜져있을 때는 신규 api를 사용하도록 했다. watcher가 감지하여 로컬캐시가 리로딩되도록 했다. 문제가 발생하면 바로 off했다.

---

## 프론트엔드 기술로 동료들 삶의 질 높여주기 (카카오뱅크 Fun 프로젝트 개발기)

14:00-14:45

사례 1. 카카오뱅크가 처음 생기고 입사했을 때 개발 방향이나 서비스 방향도 정해져 있지 않은 상황이었다. 뭐라도 개발을 하고 싶었는데, 2~3개월 정도 뭔가를 할 수가 없는 상태였다. 그래서 **사내 카페를 돌아다녀보면서 사람들의 이야기를 들어봤다.**

ex) DRM 문서 뷰어가 고민이다. 솔루션에 로그인을 연동해야 하는데 로그인 서비스가 없다. 회의시간을 잡기가 어렵다...

프론트엔드 기술과 개발지식으로 도움을 줄 수 있을 것 같다는 생각이 들었다.

- DRM 문서 뷰어 ⇒ webviewer
- 솔루션에 로그인을 연동해야 하는데 로그인 서비스(LDAP)가 없다. ⇒ NODAP
- 회의시간을 잡기가 어렵다... ⇒ 미팅 어레인지 서비스

자신감을 얻게 되어서 다른 FUN 프로젝트로도 넘어가게 되었다.

사례 2. 제출된 신분증을 5영업일 안에 검수해야 하는데, 5일만에 100만 명의 고객이 생겼다. 전직원 250명이 검수 업무에 동원되었으나, 통합단말 프로그램을 통해야 하는데 사용과정이 복잡했다.

**편하고 재밌게 만들고 싶다.** → 단말이 아니라 웹으로 / 일이 아니라 게임으로 / 작업분배는 자동으로 / 단축키 / 이중검수 가능하도록.

OCR Slayer라는 이름으로 게임처럼 만들어 냈다. 캐릭터와 스토리 작업을 만들었다. 하지만, 이 프로그램을 만들었을 무렵에는 은행권 출신의 cs팀이 갖춰진 상태였고, 해당 팀과 입장이 좁혀지지 않았다. **gamification은 실패했지만, 개발 프로세스를 거쳐서 업무용 툴처럼 만들어서 결국 효율성을 높였다.** 결과는 1인당 2천건 → 6천건 이상 처리하게 되었다.

사례 3. 오피스의 자리배치표 + 지도를 만들어달라는 요청이 있었다. 기존 사례 (서점, 다른 회사, 미술관 등)를 리서치했는데, 프론트엔드 개발자로서 어떻게 풀어나갈지 고민이 되었다. 딱 봤을 때 감탄이 나오도록 하고 싶었고, 편했으면 좋겠고, 유려했으면 좋겠다고 생각했다. 그래서 생각한 것이 Web 3D(three.js)로 심즈나 심시티 같은 게임처럼 만들고 싶다고 생각했다. 매일 사용하는 사내정보 시스템에 3D를 적용하면 어떤 모습일지 궁금했다.

3D Game 고전게임을 벤치마킹 (테마병원, 심즈, 심시티) 했고, 개념 증명 후 CTO 시연해서 본 개발 진행을 승인 받아 5개월 간 진행해 Floor라는 프로젝트를 완성시켰다. 구조도를 그대로 옮겼고, 자리를 누르면 누구의 자리이며 이 사람의 휴가정보 등도 표시가 된다. 책상의 휴지나 책 등도 랜덤으로 나타난다. 애니메이션도 존재했고, 재미있는 게임 요소가 추가되어 있다. 

사례 4. 유연근무제 + 주 52시간 근무제가 도입되면서 20일 안에 인사관리 시스템을 새롭게 개편해야 했다. 단순히 인사관리 시스템을 만드는 것을 넘어, 일하는 방식도 관련이 될 수 있을 것이라 생각했다. 그래서 날짜간 이동이 핵심이므로 캘린더를 떠올렸고, on-off라는 메타포를 생각했다. workOn이라는 인사관리 시스템을 만들었다. 배포 후 1일 1업데이트를 하면서 운영을 해나가면서 밀접하게 고쳐 나갔고, 해당 정책과 시스템의 직원 만족도는 90퍼센트로 높게 나왔다. **일하는 문화를 개선하는 데에도 프론트엔드 개발자가 할 일이 있었다.**

---

## 광고서버 연대기

15:00-15:45

광고는 총 4개의 요소로 움직인다: f(targeting, creative(소재: 이미지, 동영상, 텍스트 등), pricing(과금), placement(게재 위치)) 이 4가지 요소를 섞어서 만든 것이 광고 상품이다.

매체사는 유저에게도 좋은 광고를 보여주어야 하고, 광고주에게도 좋은 수익을 안겨줄 수 있어야 한다. 광고주는 광고를 최적화하여 효율성을 높이려고 한다.

디지털 광고 규모는 2018년 기준 5조이며, 매년 10~15% 성장하고 있다. 글로벌로는 구글+페이스북 합치면 206조에 달한다.

카카오가 약 30%, 네이버가 약 50% 수준의 광고 수입을 내고 있다.

광고서버의 발전과정.

광고서버는 과거에는 존재하지 않았다. 매체 서버가 그 역할을 함께 했다. 광고를 직접 매체사에 보낸다. (이미지 배너나 html 페이지를 넣는 형태) 플래시나 JS가 들어간 화려한 광고가 주목을 받았다.

가능한 많은 광고 물량을 가져와야 했고, 다양한 매체사의 요구사항 (소재 교체 등) 및 운영에 어려움을 겪었다. 서비스와는 별개로 비즈니스 요구사항을 독립적으로 수용할 수 있는 시스템이 탄생했다. 

과거에는 매체 파워가 얼마나 센지, 매체 영업을 해오는 것이 중요했다고 한다. 세일즈나 광고주의 요구사항에 맞춰 새로운 이벤트 페이지를 만드는 작업이 가장 많았다. 아직 타케팅은 초기 단계라 가능하지 않았기 때문에, 디스플레이보다 브랜딩 홍보 목적 등으로 사용되었다. 성과를 중시하는 중소 광고주는 주로 타게팅 효율이 좋은 검색광고 시장을 더 중요하게 생각했다. 관련기술도 거기에 맞춰서 발전했다.

규모가 어느 정도 있는 광고주는 여러 매체에 광고를 싣는 데 어려움을 겪었다. 그 문제를 해결하고자 광고주 사이드에도 광고서버가 생겨났다. 이 광고 서버를 통해 소재를 전달했다. 지금처럼 실시간 비딩이 발전하지 않아, 매체별로 광고시스템에 접속해 광고주가 송출할 수 있는 방식을 사용했다.

중소형 매체가 연합하거나, 별도 사업체가 나와서 영업 및 운영을 대행하는 형태로 비즈니스가 발전했는데, 그게 Adnetwork이다. 각각의 매체별로 계약하는 수고를 덜었다. 매체는 비용을 줄여나갔다.

광고주 특성에 맞게 보장형, 성과형 등으로 구분했다. 세일즈 포인트로 지면이 중요했으므로, 지면에 따라 adnetwork가 분리되어 있었다.

adnetwork 간에 수요와 공급 불균형으로 복잡하게 거래하면서 복잡도가 증가하는 문제가 발생했다. 이를 해결하고자 adx가 등장했다.

2016년 하반기 ADX가 등장했다. SSP를 통해 지면별로 요구사항에 따라 DSP와 실시간 입찰 경쟁을 하는 구조이다.

DMP(Data Management Platform)도 생겨났는데, DMP는 사용자와 광고주 사이에서 사용자를 분석해서 광고주에게 전달한다. 개인정보보호법이 엄격해서 데이터 수집 자체가 쉽지 않다.

SSP, DSP, DMP를 유기적으로 통합하는 게 유리. 하나의 광고플랫폼으로 사업을 해나간다.

direct sales → programmatic → A.I. 로 발전해 나간다. 기술력이 사업을 주도하는 방향으로 패러다임이 변하고 있다. 그렇다고 direct sales가 사라진다거나 영업이 사라진다는 말이 아니다. 기술력이 점점 더 중요한 요소가 될 것이라는 의미다.

여러 개의 광고 캠페인을 운영하면서 수동으로 반복해야 하는데, 본인이 사용하는 광고 플랫폼에 대한 이해도 / 개인 실력에 따른 편차가 심해서 노력이 요구된다. 최소 정보만 입력하면 원하는 대로 최적화해주는 모습으로 발전해 나갈 것이다. 실력있는 마케터를 이기는 데에는 시간이 걸리겠지만 그래도 보통의 마케터 정도는 될 것이다.

DCO(Dynamic Creative Optimization): 다이나믹하게 집행해보고 결과를 보고 최적화해서 집행. 이런 곳에 AI 기술이 많이 활용되고 있다.

광고 매체도 새롭게 등장한다. AR, VR, Game.

비즈니스 모델로 새로운 아이디어를 생각해보면 더 새로운 시야를 넓힐 수 있을 것이다.

Q. 광고가 나가고 나서 실제로 퍼포먼스가 얼마나 생겼는지 퍼포먼스 측정은 어떻게 하는지? A. ROAS를 측정하려면 전환과 매출을 알 수 있어야 한다. 광고주 sdk가 있다. 광고주가 설치하게 되면, 이를 통해 수집. 거기에 맞춰서 최적화하는 작업을 진행한다.

A. 멀티터치는 지원하지 않는다. 행동유도버튼 정도만 제공. 최종랜딩만으로 제공.

Q. 페이스북 등은 thrid-party와 연동하여 measurement 측정. 카카오도 하는지? 웹/앱/모바일이 분절되어 있는데 어떻게 연동하려는 계획이 있는지? A. 광고주가 카카오 sdk 외에도 MAT라 부르는 여러 솔루션을 사용하고 있다. 카카오도 매크로 제공하고 있다. 사실 앱에서 아웃랜딩해서 별도의 브라우저가 띄워지거나 pc로 별도 접속하면 사용자의 행태가 식별자가 다르므로 매칭할 수 없다. 그 기술이 있다 해도 할 수가 없다. 매칭하는 것을 연구하고 있는데, 아직까지는 확실한 방법이 있지는 않음. 쉽지 않은 문제다.

Q. 광고 생태계가 유투브로 넘어간다고 생각하는데 이런 분위기가 궁금하다. A. 유투브 레드를 구독모델을 선택할 수 있게 선택권을 주고 광고 수량을 매우 늘렸다. 두 개 비즈니스 모델을 잘 엮었다. 글로벌로 보면 너무 큰 회사여서 쉽지는 않다.