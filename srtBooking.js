const { Builder, By, Key, until } = require("selenium-webdriver");
let reserved = false;

(async function srtBookingMacro() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. SRT 로그인 페이지 접속
    await driver.get("https://etk.srail.kr/cmc/01/selectLoginForm.do");

    // 2. 로그인 정보 입력
    await driver.findElement(By.id("srchDvNm01")).sendKeys("아이디입력"); //  SRT 아이디 입력
    await driver
      .findElement(By.id("hmpgPwdCphd01"))
      .sendKeys("비밀번호입력", Key.RETURN); //  비밀번호 입력

    console.log("로그인 성공!");

    // 3. 검색화면 이동
    await driver.get("https://etk.srail.kr/hpg/hra/01/selectScheduleList.do");

     // 4. 출발역, 도착역, 날짜 및 시간 입력
      // 4.1 출발역
      await driver.executeScript(`
        let input = document.getElementById('dptRsStnCdNm');
        input.value = '부산';  
      `);

      // 4.2 도착역
      await driver.executeScript(`
        let input = document.getElementById('arvRsStnCdNm');
        input.value = '동탄'; 
      `);

      // 4.3 날짜
      await driver.executeScript(`
        let input = document.querySelector("[name='dptDt']"); 
        input.value = '20250304'; 
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      `);

      /*
        00 시 : 000000
        02 시 : 020000
        04 시 : 040000
        06 시 : 060000
        08 시 : 080000
        10 시 : 100000
        12 시 : 120000
        14 시 : 140000
        16 시 : 160000
        18 시 : 180000
        20 시 : 200000
        22 시 : 220000
        */
      // 4.4 시간
      await driver.executeScript(`
        let select = document.getElementById('dptTm');
        select.value = '100000'; 
        select.dispatchEvent(new Event('change', { bubbles: true }));
      `);

    while (!reserved) {
     
      // 5. 조회버튼 클릭
      const searchBtn = await driver.wait(
        until.elementIsVisible(
          driver.findElement(By.css("input[type='submit'][value='조회하기']"))
        ),
        5000
      );

      await searchBtn.click();
      await driver.sleep(2000);

      console.log("기차 조회 완료!");

      // 6. 예약 가능한 기차 찾기 (일반실)
      let reserveBtns = await driver.findElements(
        By.xpath("//tr/td[7]/a[span[text()='예약하기']]") // XPath는 인덱스가 1부터 시작함.
      );
      if (reserveBtns.length > 0) {
        await reserveBtns[0].click();
        await driver.sleep(2000);
        reserved = true;
      }

      if (reserved) {
        console.log("예약이 완료되어 반복 중지 ! 예매내역을 확인하세요.");
        break; // 성공하면 반복 종료
      } else {
        console.log("예약 가능한 일반실 없음! 다시 조회.");
      }

      await driver.sleep(3000); // 3초 후 재조회
    }
  } catch (err) {
    console.error(" 오류 발생:", err);
  } finally {
    await driver.quit();
  }
})();
