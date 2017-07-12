package fi.helsinki.cs.joosakur.asmgr.test;

public final class TestUtils {
    private TestUtils() {
    }

    public static String randomAlphabetString(int length, boolean spaces, boolean scandinavians) {
        if(length < 1)
            throw new IllegalArgumentException();

        StringBuilder builder = new StringBuilder("" + randomAlphabet(false, scandinavians));
        for (int i = 0; i < length-1; i++) {
            builder.append(randomAlphabet(spaces, scandinavians));
        }

        return builder.toString();
    }

    public static String randomAlphabetString(int minLength, int maxLength, boolean spaces, boolean scandinavians) {
        int length = (int) (minLength + Math.random()*(maxLength-minLength+1));
        return randomAlphabetString(length, spaces, scandinavians);
    }


    private static char randomAlphabet(boolean spaces, boolean scandinavians) {
        double r = Math.random();
        if(spaces && r < 0.2)
            return ' ';
        if(scandinavians && r < 0.4)
            return scandinavian();
        else if(r < 0.7)
            return randomAlphabetUpperCase();
        else return randomAlphabetLowerCase();
    }

    private static char randomAlphabetLowerCase() {
        return (char)(97 + (int)(Math.random()*26));
    }

    private static char randomAlphabetUpperCase() {
        return (char)(65 + (int)(Math.random()*26));
    }

    private static char scandinavian() {
        return Math.random() < 0.5 ? 'ä' : 'Ö';
    }


}
