package fi.helsinki.cs.joosakur.asmgr.rest.model.workshift;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

/**
 * WorkshiftPost
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2017-07-11T14:35:13.497Z")

public class WorkshiftPost {
    @JsonProperty("assistantId")
    private UUID assistantId = null;

    @JsonProperty("start")
    private LocalDateTime start = null;

    @JsonProperty("end")
    private LocalDateTime end = null;

    public WorkshiftPost assistantId(UUID assistantId) {
        this.assistantId = assistantId;
        return this;
    }

    /**
     * Get assistantId
     *
     * @return assistantId
     **/
    @ApiModelProperty(value = "")
    public UUID getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(UUID assistantId) {
        this.assistantId = assistantId;
    }

    public WorkshiftPost start(LocalDateTime start) {
        this.start = start;
        return this;
    }

    /**
     * Get start
     *
     * @return start
     **/
    @ApiModelProperty(value = "")
    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public WorkshiftPost end(LocalDateTime end) {
        this.end = end;
        return this;
    }

    /**
     * Get end
     *
     * @return end
     **/
    @ApiModelProperty(value = "")
    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkshiftPost workshiftPost = (WorkshiftPost) o;
        return Objects.equals(this.assistantId, workshiftPost.assistantId) &&
                Objects.equals(this.start, workshiftPost.start) &&
                Objects.equals(this.end, workshiftPost.end);
    }

    @Override
    public int hashCode() {
        return Objects.hash(assistantId, start, end);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class WorkshiftPost {\n");

        sb.append("    assistantId: ").append(toIndentedString(assistantId)).append("\n");
        sb.append("    start: ").append(toIndentedString(start)).append("\n");
        sb.append("    end: ").append(toIndentedString(end)).append("\n");
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

