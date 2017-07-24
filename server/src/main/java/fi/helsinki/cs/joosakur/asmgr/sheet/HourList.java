package fi.helsinki.cs.joosakur.asmgr.sheet;

import org.jopendocument.dom.ODValueType;
import org.jopendocument.dom.OOUtils;
import org.jopendocument.dom.spreadsheet.*;

import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.util.List;

/**
 * Created by joza on 21.7.2017.
 */
public class HourList {

    private Sheet sheet;

    public HourList(Sheet sheet) {
        this.sheet = sheet;
    }

    private void setCellText(int column, int row, String text) {
        MutableCell<SpreadSheet> cell = sheet.getCellAt(column, row);
        cell.setValue(text, ODValueType.STRING, false, true);
    }

    public void setEmployerName(String name) {
        setCellText(4,3,name);
    }

    public void setAssistantName(String name) {
        setCellText(4,4,name);
    }

    public void setAssistantSocialNumberStart(String string) {
        setCellText(4,5,string);
    }

    private void populateSummary(List<HourListRow> rows) {

        Duration hours = Duration.ZERO;
        Duration eveningHours = Duration.ZERO;
        Duration satHours = Duration.ZERO;
        Duration sunHours = Duration.ZERO;
        Duration nightHours = Duration.ZERO;

        for (HourListRow row : rows) {
            hours = hours.plus(row.getNormalDuration());
            eveningHours = eveningHours.plus(row.getEveningDuration());
            satHours = satHours.plus(row.getSaturdayDuration());
            sunHours = sunHours.plus(row.getSundayDuration());
            nightHours = nightHours.plus(row.getNightDuration());
        }

        final int SUMMARY_ROW = 32;
        DurationFormatter formatter = new DurationFormatter();
        setCellText(2, SUMMARY_ROW, ""+rows.size());
        setCellText(5, SUMMARY_ROW, formatter.apply(hours));
        setCellText(6, SUMMARY_ROW, formatter.apply(eveningHours));
        setCellText(7, SUMMARY_ROW, formatter.apply(satHours));
        setCellText(8, SUMMARY_ROW, formatter.apply(sunHours));
        setCellText(9, SUMMARY_ROW, formatter.apply(nightHours));
    }

    public void setHourListRows(List<HourListRow> rows) {
        int r = 8;
        for (HourListRow row : rows) {
            int c = 1;
            for (String cellValue : row.toColumnValueStrings()) {
                setCellText(c, r, cellValue);
                c++;
            }
            r++;
        }

        populateSummary(rows);
    }


    public File saveAs(String filePath) throws IOException {
        File outputFile = new File(filePath);
        return sheet.getSpreadSheet().saveAs(outputFile);
    }

    public void saveAsAndOpen(String filePath) throws IOException {
        OOUtils.open(saveAs(filePath));
    }


}
