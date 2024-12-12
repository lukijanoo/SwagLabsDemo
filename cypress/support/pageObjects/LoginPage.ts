import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    fillUsername(username: string) {
        this.fillInput('#user-name', username);
    }

    fillPassword(password: string) {
        this.fillInput('#password', password);
    }

    clickLoginButton() {
        this.clickElement('#login-button');
    }

    verifyLoginImage(src: string) {
        this.verifyElementAttribute('img[class="bot_column"]', 'src', src);
    }

    login(username: string, password: string) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
    }
}
