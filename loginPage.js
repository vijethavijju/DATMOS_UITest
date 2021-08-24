const this.url="https://accounts.datoms.io/login"
const this.labelLogin=element(by.css(".head"))
const this.inputEmail=element(by.id("email"))
const this.inputPassword=element(by.id("password"))
const this.btnLogin=element(by.id("form_submit_btn"))
const this.linkForgotPswd=element(by.id("forgot_pswd"))
const this.errorMsg=element(by.id("show_message"))
const this.btnRecoverAccount=element(by.id("login_back"))
const this.btnLoginBack=element(by.id("back_login"))

describe("Login page spec", (){

beforeEach()
{
await browser.driver.get(this.url)
expect(await protractor.expectedCondition.isDisplayed(this.labelLogin),10000,"Unable to find login label")
}

it("1. Login with valid credentials", ({
await this.inputEmail.sendKeys("vijetha120399@gmail.com")
await this.inputPassword.sendKeys("1234")
await this.btnLogin.click()
})

it("2. Login with invalid credentials", ({
await this.inputEmail.sendKeys("abc@gmail.com")
await this.inputPassword.sendKeys("1234")
expect(await protractor.expectedCondition.isDisplayed(this.errorMsg),10000,"Unable to find error message")

})

it("3. Validate login page with incorrect email", ({
await this.inputEmail.sendKeys("abc")
await this.inputPassword.sendKeys("1234")
await this.btnLogin.click()
expect(await protractor.expectedCondition.isDisplayed(this.errorMsg),10000,"Unable to find error message")
expect(this.errorMsg.getText()).toBe("Please enter a valid email!", "Incorrect error message")

})


it("4. Validate forgot password", ({
await this.linkforgotPswd.click()
expect(await browser.driver.getCurrentUrl()).toBe("https://accounts.datoms.io/forgot","URL mismatch")
await this.inputEmail.sendKeys("abc@gmail.com")
await this.btnRecoverAccount.click()
})

it("5. Validate forgot password for invalid email and back to login button", ({
await this.linkforgotPswd.click()
expect(await browser.driver.getCurrentUrl()).toBe("https://accounts.datoms.io/forgot","URL mismatch")
await this.inputEmail.sendKeys("abc")
await this.btnRecoverAccount.click()
expect(await protractor.expectedCondition.isDisplayed(this.errorMsg),10000,"Unable to find error message")
expect(this.errorMsg.getText()).toBe("Please enter a valid email!", "Incorrect error message")
await this.btnLoginBack.click()
expect(await browser.driver.getCurrentUrl()).toBe(this.url,"URL mismatch")

})

it("6. Validate login page for empty value", ({
await this.inputpassword.sendKeys("1234")
await this.btnLogin.click()
expect(await protractor.expectedCondition.isDisplayed(this.errorMsg),10000,"Unable to find error message")
expect(this.errorMsg.getText()).toBe("Email field cannot be empty!", "Incorrect error message")
await this.inputPassword.clear()
await this.inputEmail.sendKeys("abc@gmail.com")
await this.btnLogin.click()
expect(await protractor.expectedCondition.isDisplayed(this.errorMsg),10000,"Unable to find error message")
expect(this.errorMsg.getText()).toBe("Email field cannot be empty!", "Incorrect error message")
})


})


