# 🚄 SRT 자동 예약 매크로

이 프로젝트는 **Selenium**을 사용하여 **SRT 예매를 자동화**하는 매크로입니다.\
예약 가능한 **일반실이 나오면 자동으로 예약을 시도**합니다.

## 📌 1. 사전 준비

### 1-1. **Chrome 브라우저 설치**

매크로는 **Google Chrome**을 사용하므로, Chrome이 설치되어 있어야 합니다.\
🔗 [Chrome 다운로드](https://www.google.com/chrome/)

### 1-2. **ChromeDriver 설치**

Selenium이 Chrome을 제어하려면 **ChromeDriver**가 필요합니다.

#### ✅ 자동 설치 (권장)

아래 명령어를 실행하여 ChromeDriver를 자동 설치하세요:

```sh
npm install chromedriver
```

설치 후, 정상적으로 설치되었는지 확인하려면:

```sh
npx chromedriver --version
```

#### ❌ 자동 설치 실패 시, 수동 다운로드 필요

Chrome 버전과 `chromedriver` 버전이 일치하지 않으면,\
🔗 [ChromeDriver 다운로드](https://sites.google.com/chromium.org/driver/) 페이지에서 직접 받아야 합니다.

## ⚙ 2. 실행 환경 설정

### 2-1. **Node.js 설치**

이 매크로는 **Node.js** 환경에서 실행됩니다.\
🔗 [Node.js 다운로드](https://nodejs.org/) 페이지에서 **최신 버전**을 설치하세요.

설치 후, 터미널(또는 CMD)에서 아래 명령어를 입력하여 정상적으로 설치되었는지 확인하세요:

```sh
node -v
npm -v
```

### 2-2. **Selenium 설치**

아래 명령어를 실행하여 Selenium을 설치하세요:

```sh
npm install selenium-webdriver
```

## 🚀 3. 실행 방법

### 3-1. **SRT 아이디와 비밀번호 설정**

`srtBookingMacro.js` 파일에서 본인의 **SRT 아이디와 비밀번호**를 입력하세요.

### 3-2. **매크로 실행**

프로젝트 폴더에서 아래 명령어를 실행하세요:

```sh
node srtBookingMacro.js
```

✅ 실행되면:

- **자동으로 SRT 예약 페이지에 로그인**
- **출발역, 도착역, 날짜 및 시간을 설정 후 기차를 조회**
- **일반실이 예약 가능하면 자동 예약 진행**
- **예약이 완료되면 프로그램이 종료됨**

### 📌 현재 예약 성공 여부는 **수동 확인 필요**


## ⚠ 4. 주의사항

- **이 매크로는 학습 목적으로 작성되었습니다.**
- **개인용 목적이 아닌 상업적 목적등으로 이용하는 것을 엄중히 금합니다.**
- **SRT 웹사이트 정책상 과도한 자동화 요청은 계정이 차단될 수 있습니다.**

