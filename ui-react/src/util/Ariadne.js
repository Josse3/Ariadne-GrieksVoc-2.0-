const Ariadne = {
    toGreek(string) {
        function segment(latinstring) {
            const arrayToSegment = latinstring.split('');
            const latinArray = [];
            let temporary = [];
            let i = 0;
            arrayToSegment.forEach(index => {
                const regExp = /[/\\)(=|]/g;
                if (i !== (arrayToSegment.length - 1)) {
                    if (index.match(regExp)) {
                        temporary.push(index);
                    } else {
                        if (temporary.length) {
                            latinArray.push(temporary.join(''));
                            temporary = [];
                            temporary.push(index);
                        } else {
                            temporary.push(index);
                        }
                    }
                } else {
                    if (index.match(regExp)) {
                        temporary.push(index);
                        latinArray.push(temporary.join(''));
                    } else if (index.match('s')) {
                        latinArray.push(temporary[0]);
                        latinArray.push('s2');
                    } else {
                        latinArray.push(temporary[0]);
                        latinArray.push(index);
                    }
                    temporary = [];
                }
                i++;
            })
            return latinArray;
        }
        const latinArray = segment(string);
        const greekArray = [];
        latinArray.forEach(index => greekArray.push(giveGreekLetter(index)));
        function giveGreekLetter(index) {
            switch (index) {
                case 'a':
                    return 'α';
                case 'a/':
                    return 'ά';
                case 'a\\':
                    return 'ὰ';
                case 'a=':
                    return 'ᾶ';
                case 'a)':
                    return 'ἀ';
                case 'a(':
                    return 'ἁ';
                case 'a)/':
                    return 'ἄ';
                case 'a(/':
                    return 'ἅ';
                case 'a)\\':
                    return 'ἂ';
                case 'a(\\':
                    return 'ἃ';
                case 'a)=':
                    return 'ἆ';
                case 'a(=':
                    return 'ἇ';
                case 'a|':
                    return 'ᾳ';
                case 'a)|':
                    return 'ᾀ';
                case 'a(|':
                    return 'ᾁ';
                case 'a)/|':
                    return 'ᾅ';
                case 'a(/|':
                    return 'ᾄ';
                case 'a)\\|':
                    return 'ᾂ';
                case 'a(\\|':
                    return 'ᾃ';
                case 'b':
                    return 'β';
                case 'g':
                    return 'γ';
                case 'd':
                    return 'δ';
                case 'e':
                    return 'ε';
                case 'e)':
                    return 'ἐ';
                case 'e(':
                    return 'ἑ';
                case 'e/':
                    return 'έ';
                case 'e\\':
                    return 'ὲ';
                case 'e)/':
                    return 'ἔ';
                case 'e(/':
                    return 'ἕ';
                case 'e)\\':
                    return 'ἒ';
                case 'e(\\':
                    return 'ἓ';
                // To add: (more) accents for epsilon
                case 'z':
                    return 'ζ';
                case 'h':
                    return 'η';
                // To add: accents for eta
                case 'q':
                    return 'θ';
                case 'i':
                    return 'ι';
                // To add: accents or iota
                case 'k':
                    return 'κ';
                case 'l':
                    return 'λ';
                case 'm':
                    return 'μ';
                case 'n':
                    return 'ν';
                case 'c':
                    return 'ξ';
                case 'o':
                    return 'ο';
                case 'p':
                    return 'π';
                case 'r':
                    return 'ρ';
                case 's':
                    return 'σ';
                case 's2':
                    return 'ς';
                case 't':
                    return 'τ';
                case 'u':
                    return 'υ';
                case 'f':
                    return 'φ';
                case 'x':
                    return 'χ';
                case 'y':
                    return 'ψ';
                case 'w':
                    return 'ω';
                default:
                    return 'ADD';
            }
        }
        const greekString = greekArray.join('');
        return greekString;
    },
    toDutch(string) {
        switch (string) {
            case 'translation':
                return 'vertaling'
            default:
                return 'TOADD'
        }
    },
    renderGenus(genus) {
        let array;
        if (genus.length > 1) {
            array = genus.split(' / ');
        } else {
            array = Array(genus);
        }
        const newArray = array.map(index => {
            switch (index) {
                case 'm':
                    return 'ὁ';
                case 'v':
                    return 'ἡ';
                case 'o':
                    return 'τό';
            }
        })
        return newArray.join('/');
    }
}
export default Ariadne;