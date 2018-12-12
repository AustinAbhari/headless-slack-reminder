require('dotenv').config()
const puppeteer = require('puppeteer');

const slackInputs = {
  signInStart: '#main > section:nth-child(1) > div > header > div > form > p > a',
  workspace: '#domain',
  continue: '#submit_team_domain',
  email: '#email',
  password: '#password',
  signInButton: '#signin_btn',
  meChannel: '#col_channels_react_root > nav > div > div:nth-child(1) > div > div.c-scrollbar__hider > div > div > div:nth-child(20) > div > a > span',
  cmdInput: '#msg_input > div.ql-editor'
}

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://slack.com/signin');
  await page.type(slackInputs.workspace, 'pairin');
  await page.click(slackInputs.continue)

  await page.waitForSelector(slackInputs.email)
      .then(() => page.type(slackInputs.email, process.env.EMAIL));

  await page.type(slackInputs.password, process.env.PASSWORD);
  await page.click(slackInputs.signInButton);

  await page.waitForSelector(slackInputs.meChannel)
            .then(() => page.click(slackInputs.meChannel))

  await page.type(slackInputs.cmdInput, '/remind @agrenney its at 4:20pm');

  await page.keyboard.press('Enter');

  await browser.close();
};

run();
