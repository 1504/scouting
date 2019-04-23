#Han 4/11/19
#added the .strip method, remember to take the spaghetti directly from the api page and save it with ANSI encoding in a .txt file


def strip_brackets(inputFile):
    file = open(inputFile, "r+")
    temp = file.read()
    a = temp.strip("[")
    b = a.strip("]")
    file.close()
    f = open(inputFile, "w")
    f.write(b)
    f.close()


def read_data(inputFile):
    total = ()
    file = open(inputFile, "r+")
    f = file.readlines()
    for x in f:
        line = x.split("{}")
        for i in line:
            d = eval(i) #relatively safe because data is controlled
            total = total+d
    file.close()
    return total


def remove_null(inputFile, matchThreshold):
    cleaned = []
    temp = read_data(inputFile)
    for i in range(0, len(temp)):
        tempdict = temp[i]
        if (tempdict["match"] != ""):
            if (int(tempdict["match"]) <= matchThreshold):
                cleaned.append(temp[i])
    return cleaned


def remove_duplicates(outputFile, inputFile,  matchThreshold):
    f = open(outputFile, "w+")
    duplicatelist = remove_null(inputFile, matchThreshold)
    finished = []
    for i in range(0, len(duplicatelist)):
        if duplicatelist[i] not in duplicatelist[i + 1:]:
            finished.append(duplicatelist[i])
            f.write(str(duplicatelist[i]))
    f.close()


n = ""
while(n != "q") and (n != "Q") and (n != "quit") and (n != "Quit"):
    inputFile = str(input("Enter an input file to read from: "))
    outputFile = str(input("Enter an output file to write to: "))
    matchThreshold = int(input("Enter match limit: "))
    strip_brackets(inputFile)
    remove_duplicates(outputFile, inputFile, matchThreshold)
    n = str(input("Would you like to clean other files? Enter Q to quit: "))









