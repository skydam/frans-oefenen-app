/**
 * Practice Test Configuration for Chapter 0-1
 * Multiple-choice test mimicking Google Forms format
 * Questions are dynamically generated each time - never the same test twice!
 */
export const practiceTestConfig = {
  id: 'practice-ch0-1',
  name: 'Toets Oefening Ch 0-1',
  description: 'Oefen met meerkeuzevragen - zoals op de echte toets',
  chapterId: 'ch0-1',
  icon: 'ClipboardCheck',
  color: 'from-orange-400 to-red-500',

  // Question type distribution (matches Google Forms test)
  questionTypes: [
    // Grammar: Articles and plural/singular
    { type: 'singular-to-plural', count: 3 },      // 3 questions: la semaine → les semaines
    { type: 'plural-to-singular', count: 3 },      // 3 questions: les amis → l'ami
    { type: 'article-swap-to-un-une', count: 4 },  // 4 questions: le jour → un
    { type: 'article-swap-to-le-la', count: 4 },   // 4 questions: une cousine → la

    // Numbers
    { type: 'number-math', count: 3 },             // 3 questions: 8 + 3 = onze
    { type: 'number-sequencing', count: 1 },       // 1 question: order numbers

    // Vocabulary
    { type: 'odd-one-out', count: 4 },             // 4 questions: which doesn't belong?
    { type: 'dialogue-matching', count: 1 }        // 1 question: match dialogues
  ],

  totaal: 23, // Total questions in test
  slaagPercentage: 70, // Percentage needed to pass
  isMultipleChoice: true,
  tijdLimiet: null // No time limit
};
