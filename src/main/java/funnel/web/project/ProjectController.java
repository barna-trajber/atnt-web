

package funnel.web.project;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/project")
public class ProjectController {
	private final ProjectRepository  projectRepo = new InMemoryProjectRepository();
	//private final UserRepository userRepo = new InMemoryUserRepository();		
	
    public ProjectController() {

    }

    @RequestMapping(value = {"/index", ""}, method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("project/index", "", null);
    }

    @RequestMapping(value = {"/index_partial"}, method = RequestMethod.GET)
    public ModelAndView index_partial() {
        return new ModelAndView("project/index :: bodyFragment", "", null);
    }
   
   /* [HttpPost]
            public IActionResult IterateStatusForward(string recId)
            {
                int id = -1;

                if (String.IsNullOrEmpty(recId) || !Int32.TryParse(recId, out id))
                {
                    return Json(new { message = "Invalid record ID!", iserror = true });
                }

                // Trying to get the specified record
                Project projectToIterate = DataContext.Projects.FirstOrDefault(p => p.ID == id);
                if (projectToIterate == null)
                {
                    return Json(new { message = "Invalid record Project!", iserror = true });
                }

                // Getting current status
                StatusEnum currentStatus;
                if (!Enum.TryParse(projectToIterate.Status, out currentStatus))
                {
                    return Json(new { message = "Invalid Project status!", iserror = true });
                }

                // Iterating the current status
                StatusEnum newStatus = DataContext.IterateStatus(currentStatus);
                projectToIterate.Status = newStatus.ToString();

                // Successfully iterated the record!
                return Json(new { message = "OK", iserror = false });

                //return RedirectToAction("Index_PartialView");
            }*/
    
    @RequestMapping(value = {"/getAllAppDeploymentData"}, method=RequestMethod.GET)
    public @ResponseBody List<Project> GetAllAppDeploymentData() {
    	return projectRepo.findAll();  	
    }
   
    /*
    @RequestMapping(value = {"/getAllAPM"}, method=RequestMethod.GET)
    public @ResponseBody List<User> GetAllAPM() {
    	return userRepo.findAll();  	
    }*/
   
}