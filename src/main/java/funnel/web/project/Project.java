package funnel.web.project;

import java.util.Date;
import java.util.GregorianCalendar;

import com.fasterxml.jackson.annotation.JsonFormat;

import funnel.web.project.enums.ReleaseTypeEnum;
import funnel.web.project.enums.StatusEnum;

public class Project
{
	public long id;
   
    public int assetID;

    public String accountId = "Minta Miklos";

    public String assetName;

    public String assetType;

    public String assetStatus;

    public String domainName;

    public String subDomainName;

    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    public Date targetDate;

    public String note;

    public String dpm = "Ajaibir Singh1";

    public String apm_spm;

    public String status = StatusEnum.Engaged.toString();

    public String releaseType = ReleaseTypeEnum.Sunset.toString();
    
    public String nextStatus = getNextStatus();
    
	public String getNextStatus() {
        StatusEnum currentState = StatusEnum.valueOf(status.toString());
        
        switch (currentState)
        {
            case Engaged:
                return StatusEnum.Iterated.toString();

            case Iterated:
                return StatusEnum.Completed.toString();

            case Completed:
            default:
                return "";
        }  
	}    
}

