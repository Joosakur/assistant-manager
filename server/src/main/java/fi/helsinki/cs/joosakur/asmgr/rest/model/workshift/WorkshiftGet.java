package fi.helsinki.cs.joosakur.asmgr.rest.model.workshift;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import org.joda.time.LocalDate;

import java.util.Objects;
import java.util.UUID;

/**
 * WorkshiftGet
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class WorkshiftGet {
    @JsonProperty("id")
    private UUID id = null;

    @JsonProperty("start")
    private LocalDate start = null;

    @JsonProperty("end")
    private LocalDate end = null;

    @JsonProperty("assistant")
    private WorkshiftsAssistant assistant = null;

    public WorkshiftGet id(UUID id) {
        this.id = id;
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

    public WorkshiftGet start(LocalDate start) {
        this.start = start;
        return this;
    }

    /**
     * Get start
     *
     * @return start
     **/
    @ApiModelProperty(value = "")
    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public WorkshiftGet end(LocalDate end) {
        this.end = end;
        return this;
    }

    /**
     * Get end
     *
     * @return end
     **/
    @ApiModelProperty(value = "")
    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public WorkshiftGet assistant(WorkshiftsAssistant assistant) {
        this.assistant = assistant;
        return this;
    }

    /**
     * Get assistant
     *
     * @return assistant
     **/
    @ApiModelProperty(value = "")
    public WorkshiftsAssistant getAssistant() {
        return assistant;
    }

    public void setAssistant(WorkshiftsAssistant assistant) {
        this.assistant = assistant;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkshiftGet workshiftGet = (WorkshiftGet) o;
        return Objects.equals(this.id, workshiftGet.id) &&
                Objects.equals(this.start, workshiftGet.start) &&
                Objects.equals(this.end, workshiftGet.end) &&
                Objects.equals(this.assistant, workshiftGet.assistant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, start, end, assistant);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class WorkshiftGet {\n");

        sb.append("    id: ").append(toIndentedString(id)).append("\n");
        sb.append("    start: ").append(toIndentedString(start)).append("\n");
        sb.append("    end: ").append(toIndentedString(end)).append("\n");
        sb.append("    assistant: ").append(toIndentedString(assistant)).append("\n");
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

