package funnel.web.account;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Barna Trajber
 */
@Controller
@RequestMapping({"/account"})
public class AccountController {

    public AccountController() {

    }

    @RequestMapping(value = {"", "/", "/index"}, method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("account/login", "", null);
    }

    @RequestMapping(value = "/index_partial", method = RequestMethod.GET)
    public ModelAndView index_partial() {
        return new ModelAndView("account/login :: bodyFragment", "", null);
    }

    @RequestMapping(value = {"/logout", "/logoff"}, method = RequestMethod.GET)
    public String logOut()
    {
        //AccountController.UserLoggedIn = null;
        return "account/index";
        //return RedirectToAction("Index", "Home");
    }
}
