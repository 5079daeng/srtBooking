const { Builder, By, Key, until } = require("selenium-webdriver");
const SRT_STATIONS = {
  수서: "0551",
  동탄: "0552",
  평택지제: "0553",
  경주: "0508",
  곡성: "0049",
  공주: "0514",
  광주송정: "0036",
  구례구: "0050",
  김천구미: "0507",
  나주: "0037",
  남원: "0048",
  대전: "0010",
  동대구: "0015",
  마산: "0059",
  목포: "0041",
  밀양: "0017",
  부산: "0020",
  서대구: "0506",
  순천: "0051",
  여수EXPO: "0053",
  여천: "0139",
  오송: "0297",
  "울산(통도사)": "0509",
  익산: "0030",
  전주: "0045",
  정읍: "0033",
  진영: "0056",
  진주: "0063",
  창원: "0057",
  창원중앙: "0512",
  천안아산: "0502",
  포항: "0515",
};

// 사용자 입력 데이터
const USER_ID = "SRT아이디";
const PASSWORD = "SRT비밀번호";
const DEPARTURE = "동탄";
const ARRIVAL = "부산";
const TRAVEL_DATE = "20250311"; 
const TRAVEL_TIME = "130000";

let reserved = false;

(async function srtBookingMacro() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://etk.srail.kr/cmc/01/selectLoginForm.do");

    await driver.findElement(By.id("srchDvNm01")).sendKeys(USER_ID);
    await driver
      .findElement(By.id("hmpgPwdCphd01"))
      .sendKeys(PASSWORD, Key.RETURN);

    await driver.get("https://etk.srail.kr/hpg/hra/01/selectScheduleList.do");

    await driver.executeScript(`
    document.getElementById('dptRsStnCd').value = '${SRT_STATIONS[DEPARTURE]}';
    document.getElementById('arvRsStnCd').value = '${SRT_STATIONS[ARRIVAL]}';
    document.getElementById('dptDt').value = '${TRAVEL_DATE}';
    document.getElementById('dptTm').value = '${TRAVEL_TIME}';
    `);

    await driver.sleep(500);

    await driver
      .findElement(By.css("input[type='submit'][value='조회하기']"))
      .click();

    console.log("조회.");

    await driver.sleep(300);
    while (!reserved) {
      let seatList = await driver.findElements(
        By.css(
          "#result-form > fieldset > div.tbl_wrap.th_thead > table > tbody > tr"
        )
      );

      for (let i = 1; i <= seatList.length; i++) {
        let seat = await driver
          .findElement(
            By.css(
              `#result-form > fieldset > div.tbl_wrap.th_thead > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`
            )
          )
          .getText();

        if (seat.includes("예약하기")) {
          let reserveBtn = await driver.findElement(
            By.xpath(
              `/html/body/div[1]/div[4]/div/div[3]/div[1]/form/fieldset/div[6]/table/tbody/tr[${i}]/td[7]/a/span`
            )
          );

          try {
            await reserveBtn.click();
            await driver.sleep(1000);

            try {
              const alertBox = await driver.findElement(
                By.xpath("//div[contains(@class, 'alert_box')]//strong")
              );
              const alertText = await alertBox.getText();
              if (
                alertText.trim() ===
                "10분 내에 결제하지 않으면 예약이 취소됩니다."
              ) {
                console.log(
                  "예약 성공! 10분 내에 결제하지 않으면 예약이 취소됩니다."
                );
                reserved = true;
                break;
              }
            } catch (e) {
              console.error(
                `예약 실패. 에러메세지 : ${e.message || JSON.stringify(e)}`
              );
            }

          } catch (e) {
            console.error(
              `예약 실패. 에러메세지 : ${e.message || JSON.stringify(e)}`
            );
          }
        }
      }

      if (!reserved) {
        console.log("예약 가능한 좌석 없음.");
        await driver.sleep(3000);

        try {
          let refreshBtn = await driver.findElement(
            By.xpath(
              "/html/body/div/div[4]/div/div[2]/form/fieldset/div[2]/input"
            )
          );
          await driver.executeScript("arguments[0].click();", refreshBtn);
        } catch (e) {
          await driver.navigate().back();
          await driver.sleep(1000);
          await driver.navigate().refresh();
        }
      }
      await driver.sleep(200);
    }
  } catch (e) {
    console.error(`에러 : ${e.message || JSON.stringify(e)}`);
  } 
//   finally {
//     await driver.quit();
//   }
})();




