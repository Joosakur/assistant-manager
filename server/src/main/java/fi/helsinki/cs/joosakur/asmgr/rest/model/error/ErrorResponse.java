package fi.helsinki.cs.joosakur.asmgr.rest.model.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import fi.helsinki.cs.joosakur.asmgr.exception.AppErrors;
import io.swagger.annotations.ApiModelProperty;

import java.util.Objects;

/**
 * ErrorResponse
 */
public class ErrorResponse {
    @JsonProperty("message")
    private String message = null;

    @JsonProperty("errorCode")
    private AppErrors errorCode;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public ErrorResponse(String message, AppErrors errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }

    /**
     * Get message
     *
     * @return message
     **/
    @ApiModelProperty(value = "")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Get errorCode
     *
     * @return errorCode
     **/
    @ApiModelProperty(value = "")
    public AppErrors getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(AppErrors errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ErrorResponse errorResponse = (ErrorResponse) o;
        return Objects.equals(this.message, errorResponse.message)
                && Objects.equals(this.errorCode, errorResponse.errorCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, errorCode);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class ErrorResponse {\n");

        sb.append("    message: ").append(toIndentedString(message)).append("\n");
        sb.append("    error code: ").append(toIndentedString(errorCode)).append("\n");
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

