package funnel.web.appservices;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/appservices")
public class AppServicesController {

	public AppServicesController() {
		
	}
	
	@RequestMapping(value = {"/sunsetrequest"}, method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("project/sunsetRequest", "", null);
    }

    @RequestMapping(value = {"/sunsetrequest_partial"}, method = RequestMethod.GET)
    public ModelAndView index_partial() {
        return new ModelAndView("project/sunsetRequest :: bodyFragment", "", null);
    }
    
    @RequestMapping(value = {"/createsunset"}, method = RequestMethod.POST)
    public ModelAndView	createSunset() {
    	return new ModelAndView("project/index", "", null);
    }
    
    @RequestMapping(value = {"/getassignmodal_partial"}, method = RequestMethod.GET)
    public ModelAndView getAssignModal_partial() {
    	return new ModelAndView("project/_assignModal :: bodyFragment", "", null);
    }
    
    @RequestMapping(value = {"/getAllAppDeploymentData"}, method = RequestMethod.GET)
    public ModelAndView getAllAppDeploymentData() {
    	//return new Project();
    	return new ModelAndView("project/index");
    }
    
    
  /*  
            [HttpPost(Name = "Assign")]
            public async Task<IActionResult> Assign()
            {
                IFormCollection form = HttpContext.Request.Form;

                int userID;
                if (!Int32.TryParse(form["comboAPM"], out userID))
                {
                    return null;
                    //errorMsg.Append("<li>");
                    //errorMsg.Append("Invalid Group! Please choose one from the group selector!\n");
                    //isError = true;
                    //errorMsg.Append("</li>");
                }

                int projectId = 0;
                if (!Int32.TryParse(form["projectid"], out projectId))
                {
                    return null;
                }

                User user = DataContext.GetUserById(userID);
                Project project = DataContext.GetProjectById(projectId);
                project.APM_SPM = user.FullName;
                return RedirectToAction("Index");
            }*/
}
