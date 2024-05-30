using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]

  public class Tests : PageTest
    {
        [Test]
        public async Task LoginTest()
        {
            await Page.GotoAsync("http://localhost:4200/");
            await Page.GotoAsync("http://localhost:4200/home");
            await Page.GetByRole(AriaRole.Button, new() { Name = "Log in" }).ClickAsync();
            await Page.GetByPlaceholder("Email").ClickAsync();
            await Page.GetByPlaceholder("Email").FillAsync("mail@moellers-hule.dk");
            await Page.GetByPlaceholder("Password").ClickAsync();
            await Page.GetByPlaceholder("Password").FillAsync("DruKhari1923!");
            await Page.GetByRole(AriaRole.Main).GetByRole(AriaRole.Button, new() { Name = "Log in" }).ClickAsync();
        }
        
        [Test]
        public async Task SignupTest()
        {
            await Page.GotoAsync("http://localhost:4200/");
            await Page.GotoAsync("http://localhost:4200/home");
            await Page.GetByRole(AriaRole.Button, new() { Name = "Sign up" }).ClickAsync();
            await Page.GetByPlaceholder("First Name").ClickAsync();
            await Page.GetByPlaceholder("First Name").FillAsync("Preben");
            await Page.GetByPlaceholder("userName").ClickAsync();
            await Page.GetByPlaceholder("userName").FillAsync("PE66");
            await Page.GetByPlaceholder("Last Name").ClickAsync();
            await Page.GetByPlaceholder("Last Name").FillAsync("Elkær");
            await Page.GetByPlaceholder("email").ClickAsync();
            await Page.GetByPlaceholder("email").FillAsync("PE@fakeshit.dk");
            await Page.GetByPlaceholder("Phone Number").ClickAsync();
            await Page.GetByPlaceholder("Phone Number").FillAsync("55669977");
            await Page.GetByPlaceholder("Password").ClickAsync();
            await Page.GetByPlaceholder("Password").FillAsync("PE47");
            await Page.GetByRole(AriaRole.Button, new() { Name = "Sign Up", Exact = true }).ClickAsync();
            await Page.GetByPlaceholder("Password").ClickAsync();
            await Page.GetByPlaceholder("Password").FillAsync("ChaosKnight1923!");
            await Page.GetByRole(AriaRole.Button, new() { Name = "Sign Up", Exact = true }).ClickAsync();
        }
    }
        

