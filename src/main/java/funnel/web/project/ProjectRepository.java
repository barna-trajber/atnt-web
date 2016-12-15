
package funnel.web.project;

import java.util.List;

/**
 * @author Eszter Toth
 */

public interface ProjectRepository{
	
	List<Project> findAll();
	
	Project findProject(int id);

	void deleteProject(int id);
}