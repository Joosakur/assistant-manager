package fi.helsinki.cs.joosakur.asmgr.sheet;

import org.jopendocument.dom.ODValueType;
import org.jopendocument.dom.OOUtils;
import org.jopendocument.dom.spreadsheet.Sheet;

import java.io.File;
import java.io.IOException;
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
        sheet.getCellAt(column,row).setValue(text, ODValueType.STRING, false, true);
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
        TimeDuration hours = new TimeDuration();
        TimeDuration eveningHours = new TimeDuration();
        TimeDuration satHours = new TimeDuration();
        TimeDuration sunHours = new TimeDuration();
        TimeDuration nightHours = new TimeDuration();

        for (HourListRow row : rows) {
            hours.add(row.getNormalDuration());
            eveningHours.add(row.getEveningDuration());
            satHours.add(row.getSaturdayDuration());
            sunHours.add(row.getSundayDuration());
            nightHours.add(row.getNightDuration());
        }

        final int SUMMARY_ROW = 32;
        setCellText(2, SUMMARY_ROW, ""+rows.size());
        setCellText(5, SUMMARY_ROW, hours.toString());
        setCellText(6, SUMMARY_ROW, eveningHours.toString());
        setCellText(7, SUMMARY_ROW, satHours.toString());
        setCellText(8, SUMMARY_ROW, sunHours.toString());
        setCellText(9, SUMMARY_ROW, nightHours.toString());
    }

    public void setHourListRows(List<HourListRow> rows) {
        int r = 8;
        for (HourListRow row : rows) {
            int c = 1;
            for (String cellValue : row.toStrings()) {
                setCellText(c, r, cellValue);
                c++;
            }
            r++;
        }
        populateSummary(rows);
    }


    public void saveAs(String filePath) throws IOException {
        File outputFile = new File(filePath);
        OOUtils.open(sheet.getSpreadSheet().saveAs(outputFile));
    }
}
