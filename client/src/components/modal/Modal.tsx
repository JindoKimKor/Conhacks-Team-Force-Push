/* eslint-disable react/forbid-component-props */
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Option {
  icon?: string;
  id: string;
  label: string;
}

interface Question {
  id: number;
  options: Option[];
  question: string;
  type: "button" | "checkbox" | "radio";
}

interface ModalProps {
  onComplete: () => void;
  onProgress: (currentQuestion: number) => void;
  q1Callback: (value: string | string[]) => void;
  q2Callback: (value: string | string[]) => void;
  q3Callback: (value: string | string[]) => void;
  q4Callback: (value: string | string[]) => void;
  questions: Question[];
}

export default function Modal({
  onComplete,
  onProgress,
  q1Callback,
  q2Callback,
  q3Callback,
  q4Callback,
  questions
}: ModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  useEffect(() => {
    // Get the current question ID
    if (currentQuestion >= 0 && currentQuestion < questions.length) {
      const questionId = questions[currentQuestion].id;
      const selectedValue = answers[questionId];

      // Use the question ID to access the corresponding answer
      switch (currentQuestion) {
        case 0:
          q1Callback(selectedValue);
          break;
        case 1:
          q2Callback(selectedValue);
          break;
        case 2:
          q3Callback(selectedValue);
          break;
        case 3:
          q4Callback(selectedValue);
          break;
        default:
          break;
      }
    }
  }, [
    answers,
    currentQuestion,
    questions,
    q1Callback,
    q2Callback,
    q3Callback,
    q4Callback
  ]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      onProgress(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case "button":
        return (
          <div className="grid grid-cols-1 gap-4">
            {question.options.map(option => (
              <Button
                className="h-16 text-lg justify-start px-6"
                key={option.id}
                onClick={() => {
                  handleAnswer(option.id);
                }}
                variant={
                  answers[question.id] === option.id ? "default" : "outline"
                }>
                <span className="mr-4 text-2xl">{option.icon}</span>
                {option.label}
              </Button>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="grid grid-cols-1 gap-4">
            {question.options.map(option => {
              const isSelected = (
                (answers[question.id] as string[]) || []
              ).includes(option.id);
              return (
                <Button
                  className="h-16 text-lg justify-start px-6"
                  key={option.id}
                  onClick={() => {
                    const currentAnswers =
                      (answers[question.id] as string[]) || [];
                    if (currentAnswers.includes(option.id)) {
                      // Deselect if already selected
                      handleAnswer(
                        currentAnswers.filter(id => id !== option.id)
                      );
                    } else {
                      // Select if not already selected
                      handleAnswer([...currentAnswers, option.id]);
                    }
                  }}
                  variant={isSelected ? "default" : "outline"}>
                  {isSelected ? (
                    <div className="mr-4 flex items-center justify-center">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                  ) : null}
                  {!isSelected && <div className="mr-4 w-5" />}
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-6">
            {questions[currentQuestion].question}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {renderQuestion()}
          <Button
            className="w-full"
            disabled={!answers[questions[currentQuestion].id]}
            onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
