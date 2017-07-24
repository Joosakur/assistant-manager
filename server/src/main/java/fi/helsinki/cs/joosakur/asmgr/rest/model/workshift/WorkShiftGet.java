package fi.helsinki.cs.joosakur.asmgr.rest.model.workshift;

import com.fasterxml.jackson.annotation.JsonProperty;
import fi.helsinki.cs.joosakur.asmgr.entity.WorkShift;
import io.swagger.annotations.ApiModelProperty;

import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.UUID;

/**
 * WorkshiftGet
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class WorkShiftGet {
    @JsonProperty("id")
    private UUID id = null;

    @JsonProperty("start")
    private String start = null;

    @JsonProperty("end")
    private String end = null;

    @JsonProperty("assistantId")
    private UUID assistantId = null;

    @JsonProperty("sick")
    private Boolean sick = null;


    public WorkShiftGet fromEntity(WorkShift workShift) {
        this.id = workShift.getId();
        this.start = workShift.getStarts().format(DateTimeFormatter.ISO_DATE_TIME);
        this.end = workShift.getEnds().format(DateTimeFormatter.ISO_DATE_TIME);
        this.assistantId = workShift.getAssistant().getId();
        this.sick = workShift.isSick();
        return this;
    }

    /**
     * Get id
     *
     * @return id
     **/
    @ApiModelProperty(value = "")
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    /**
     * Get start
     *
     * @return start
     **/
    @ApiModelProperty(value = "")
    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    /**
     * Get end
     *
     * @return end
     **/
    @ApiModelProperty(value = "")
    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }


    /**
     * Get assistant
     *
     * @return assistant
     **/
    @ApiModelProperty(value = "")
    public UUID getAssistantId() {
        return assistantId;
    }

    public void setAssistant(UUID assistantId) {
        this.assistantId = assistantId;
    }

    /**
     * Get sick
     *
     * @return sick
     **/
    @ApiModelProperty(value = "")
    public Boolean getSick() {
        return sick;
    }

    public void setSick(Boolean sick) {
        this.sick = sick;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkShiftGet workShiftGet = (WorkShiftGet) o;
        return Objects.equals(this.id, workShiftGet.id) &&
                Objects.equals(this.start, workShiftGet.start) &&
                Objects.equals(this.end, workShiftGet.end) &&
                Objects.equals(this.assistantId, workShiftGet.assistantId) &&
                Objects.equals(this.sick, workShiftGet.sick);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, start, end, assistantId, sick);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class WorkshiftGet {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    start: ").append(toIndentedString(start)).append("\n");
        sb.append("    end: ").append(toIndentedString(end)).append("\n");
        sb.append("    assistant: ").append(toIndentedString(assistantId)).append("\n");
        sb.append("    sick: ").append(toIndentedString(sick)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }

}

