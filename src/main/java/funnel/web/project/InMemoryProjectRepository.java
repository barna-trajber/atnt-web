
package funnel.web.project;

import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.expression.ParseException;

import funnel.web.project.enums.StatusEnum;

/**
 * @author Eszter Toth
 */

public class InMemoryProjectRepository implements ProjectRepository {
	
	private List<Project> projects = new ArrayList<Project>();
	
	public InMemoryProjectRepository() {
		seed();
	}
	
	
	@Override
	public List<Project> findAll(){
		return this.projects;
	}
	
	@Override
	public Project findProject(int id){
		return this.projects.get(id);
	}
	
	@Override
	public void deleteProject(int id){
		this.projects.remove(id);
	}
	
	//fill projects with data
	@SuppressWarnings("serial")
	public void seed(){
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

		
	    // Populate test projects		
		try {
			projects = new ArrayList<Project>() {{			
				add(new Project() {{ id = 1; accountId = "Barna Trajber"; assetName = "Sample";  targetDate = new Date(); note = "sample note"; }});
				add(new Project() {{ id = 2; accountId = "Barna Trajber"; assetName = "1 - 3 - 9"; targetDate = new Date(); status = StatusEnum.Engaged.toString(); }});
				add(new Project() {{ id = 3; accountId = "Barna Trajber"; assetName = "2009SECIDM02 - US ITIM";      targetDate = sdf.parse("2016-11-10 10:20:56"); status = StatusEnum.Completed.toString(); }});
				add(new Project() {{ id = 4; accountId = "Barna Trajber"; assetName = "2011SECRP25 Guardium Deploy"; targetDate = sdf.parse("2016-12-11 10:20:56"); status = StatusEnum.Iterated.toString(); note="important!"; }});
				add(new Project() {{ id = 5; accountId = "Barna Trajber"; assetName = "ITSM Deployment Tool (IDT)";  targetDate = new Date(); status = StatusEnum.Completed.toString(); }});        
	        }}; 
		}
		catch (ParseException pe) {
			projects = null;
		}
		catch (Exception e) {
			projects = null;
		}
	}
	
}
