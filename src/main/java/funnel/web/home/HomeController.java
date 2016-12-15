package funnel.web.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Barna Trajber
 */
@Controller
@RequestMapping({"", "/", "/home"})
public class HomeController {

    public HomeController() {

    }
 
    @RequestMapping(value = {"", "/", "/index"}, method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("home/index", "", null);
    }
    
    @RequestMapping(value = "/index_partial", method = RequestMethod.GET)
    public ModelAndView index_partial() {
        return new ModelAndView("home/index :: bodyFragment", "", null);
    }

    @RequestMapping("foo")
    public String foo() {
        throw new RuntimeException("Expected exception in controller");

    }

    @RequestMapping(value = "/about", method = RequestMethod.GET)
    public ModelAndView about()
    {
        return new ModelAndView("home/about", "", null);
    }

    @RequestMapping(value = "/about_partial", method = RequestMethod.GET)
    public ModelAndView about_partial()
    {
        return new ModelAndView("home/about :: bodyFragment", "", null);
    }
}
